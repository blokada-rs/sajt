import type { SchemaContext } from "astro/content/config";
import { z } from "astro/zod";

type I18N = boolean | string | "duplicate" | "translate" | "none";
type CollectionBuilder = FolderBuilder | FilesBuilder | DividerBuilder;

interface Builder {
  make_cms(): any;
  make_zod(ctx: SchemaContext): any;
}

export type ZodCollection = {
  name: string;
  base: string;
  pattern: string;
  schema: (ctx: SchemaContext) => z.ZodType;
};

class CollectionsBuilder implements Builder {
  constructor(private collections: CollectionBuilder[]) {}

  make_cms() {
    return this.collections.flatMap((collection) => collection.make_cms());
  }

  make_zod(): ZodCollection[] {
    const collections: ZodCollection[] = [];
    for (const collection of this.collections) {
      if (collection instanceof DividerBuilder) {
      } else if (collection instanceof FolderBuilder) {
        collections.push(collection.make_zod());
      } else if (collection instanceof FilesBuilder) {
        collection.make_zod().forEach((collection) => {
          collections.push(collection);
        });
      } else {
        throw new Error("Not valid");
      }
    }

    return collections;
  }
}

class FolderBuilder implements Builder {
  constructor(
    public name: string,
    private label: string,
    private icon: string,
    private folder: string,
    private fields: FieldBuilder[],
  ) {}

  protected _slug: string | undefined;
  slug(value: string) {
    this._slug = value;
    return this;
  }

  protected _sort_by: string | undefined;
  sort_by(value: string) {
    this._sort_by = value;
    return this;
  }

  protected _i18n: boolean = true;
  i18n(value: boolean) {
    this._i18n = value;
    return this;
  }

  make_cms() {
    return {
      name: this.name,
      label: this.label,
      icon: this.icon,
      folder: this.folder,
      slug: this._slug,
      fields: this.fields.map((field) => field.make_cms()),
      i18n: this._i18n,
      sortable_fields:
        typeof this._sort_by !== "undefined"
          ? {
              fields: [this._sort_by],
              default: {
                field: this._sort_by,
                direction: "descending",
              },
            }
          : undefined,
    };
  }

  make_zod(): ZodCollection {
    return {
      name: this.name,
      schema: (ctx) => {
        const obj: { [name: string]: z.ZodType } = {};
        for (const field of this.fields) {
          obj[field.name] = field.make_zod(ctx);
        }

        return z.object(obj);
      },
      base: this.folder,
      pattern: "**/*.md",
    };
  }
}

class FileBuilder implements Builder {
  constructor(
    public name: string,
    private label: string,
    public folder: string,
    public file: string,
    private fields: FieldBuilder[],
  ) {}

  protected _i18n: boolean = true;
  i18n(value: boolean) {
    this._i18n = value;
    return this;
  }

  make_cms() {
    return {
      name: this.name,
      label: this.label,
      file: `${this.folder}/{{locale}}/${this.file}`,
      fields: this.fields.map((field) => field.make_cms()),
      i18n: this._i18n,
    };
  }

  make_zod(ctx: SchemaContext): z.ZodType {
    const obj: { [name: string]: z.ZodType } = {};
    for (const field of this.fields) {
      obj[field.name] = field.make_zod(ctx);
    }

    return z.object(obj);
  }
}

class FilesBuilder implements Builder {
  constructor(
    public name: string,
    private label: string,
    private icon: string,
    private files: FileBuilder[],
  ) {}

  protected _i18n: boolean = true;
  i18n(value: boolean) {
    this._i18n = value;
    return this;
  }

  make_cms() {
    return {
      name: this.name,
      label: this.label,
      icon: this.icon,
      files: this.files.map((file) => file.make_cms()),
      i18n: this._i18n,
    };
  }

  make_zod(): ZodCollection[] {
    return this.files.map((file) => ({
      name: file.name,
      schema: (ctx) => file.make_zod(ctx),
      base: file.folder,
      pattern: `**/${file.file}`,
    }));
  }
}

class DividerBuilder implements Builder {
  constructor() {}

  make_cms() {
    return { divider: true };
  }
  make_zod(): z.ZodType[] {
    return [];
  }
}

class FieldBuilder implements Builder {
  constructor(
    public name: string,
    protected label: string,
    protected widget: string,
  ) {}

  protected _required: boolean = true;
  required(value: boolean) {
    this._required = value;
    return this;
  }

  protected _i18n: I18N = true;
  i18n(value: I18N) {
    this._i18n = value;
    return this;
  }

  make_cms() {
    return {
      widget: this.widget,
      name: this.name,
      label: this.label,
      required: this._required,
      i18n: this._i18n,
    };
  }

  make_zod(ctx: SchemaContext): z.ZodType {
    return this._required ? z.any() : z.any().optional();
  }
}

export class StringBuilder extends FieldBuilder {
  constructor(name: string, label: string) {
    super(name, label, "string");
  }

  protected _url: boolean = false;
  url(value: boolean) {
    this._url = value;
    return this;
  }

  make_cms() {
    return {
      ...super.make_cms(),
      type: this._url ? "url" : "text",
    };
  }

  make_zod(): z.ZodType {
    return this._required ? z.string() : z.string().optional();
  }
}

class TextBuilder extends FieldBuilder {
  constructor(name: string, label: string) {
    super(name, label, "text");
  }

  make_zod(): z.ZodType {
    return this._required ? z.string() : z.string().optional();
  }
}

class MarkdownBuilder extends FieldBuilder {
  constructor(name: string, label: string) {
    super(name, label, "markdown");
  }

  make_zod(): z.ZodType {
    return z.string().optional();
  }
}

type ValueType = "float" | "int" | "int/string" | "float/string" | undefined;
class NumberBuilder extends FieldBuilder {
  constructor(name: string, label: string) {
    super(name, label, "number");
  }

  protected _default: number | undefined;
  default(value: number) {
    this._default = value;
    return this;
  }

  protected _type: ValueType = "float";
  type(value: ValueType) {
    this._type = value;
    return this;
  }

  make_cms() {
    return {
      ...super.make_cms(),
      default: this._default,
      value_type: this._type,
    };
  }

  make_zod(): z.ZodType {
    return this._required ? z.number() : z.number().optional();
  }
}

class BoolBuilder extends FieldBuilder {
  constructor(name: string, label: string) {
    super(name, label, "boolean");
  }

  protected _default: boolean | undefined;
  default(value: boolean) {
    this._default = value;
    return this;
  }

  make_cms() {
    return {
      ...super.make_cms(),
      default: this._default,
      i18n: "duplicate",
    };
  }

  make_zod(): z.ZodType {
    return this._required ? z.boolean() : z.boolean().optional();
  }
}

class EnumBuilder extends FieldBuilder {
  constructor(
    name: string,
    label: string,
    private options: [string, string][],
  ) {
    super(name, label, "select");
  }

  make_cms() {
    return {
      ...super.make_cms(),
      options: this.options.map(([value, label]) => ({ value, label })),
      default: this.options[0][0],
    };
  }

  make_zod(): z.ZodType {
    const option = z.enum(this.options.map(([value, _]) => value));
    return this._required ? option : option.optional();
  }
}

class DateTimeBuilder extends FieldBuilder {
  constructor(name: string, label: string) {
    super(name, label, "datetime");
  }

  protected _default: string = "{{now}}";
  default(value: string) {
    this._default = value;
    return this;
  }

  make_cms() {
    return {
      ...super.make_cms(),
      default: this._default,
      i18n: "duplicate",
      picker_utc: true,
    };
  }

  make_zod(): z.ZodType {
    const date = z.coerce.date();
    return this._required ? date : date.optional();
  }
}

class ImageBuilder extends FieldBuilder {
  constructor(name: string, label: string) {
    super(name, label, "image");
  }

  make_cms() {
    return {
      ...super.make_cms(),
      i18n: "duplicate",
    };
  }

  make_zod({ image }: SchemaContext): z.ZodType {
    return this._required ? image() : image().optional();
  }
}

class ObjectBuilder extends FieldBuilder {
  constructor(
    name: string,
    label: string,
    private fields: FieldBuilder[],
  ) {
    super(name, label, "object");
  }

  make_cms() {
    return {
      ...super.make_cms(),
      fields: this.fields.map((field) => field.make_cms()),
    };
  }

  make_zod(ctx: SchemaContext): z.ZodType {
    const obj: { [name: string]: z.ZodType } = {};
    for (const field of this.fields) {
      obj[field.name] = field.make_zod(ctx);
    }

    return this._required ? z.object(obj) : z.object(obj).optional();
  }
}

class ListBuilder extends FieldBuilder {
  constructor(
    name: string,
    label: string,
    private fields: FieldBuilder[],
  ) {
    super(name, label, "list");
  }

  protected _singular: string | undefined;
  singular(value: string) {
    this._singular = value;
    return this;
  }

  protected _summary: string | undefined;
  summary(value: string) {
    this._summary = value;
    return this;
  }

  protected _add_to_top: boolean = false;
  add_to_top() {
    this._add_to_top = true;
    return this;
  }

  make_cms() {
    return {
      ...super.make_cms(),
      fields: this.fields.map((field) => field.make_cms()),
      label_singular: this._singular,
      add_to_top: this._add_to_top,
      summary: this._summary,
    };
  }

  make_zod(ctx: SchemaContext): z.ZodType {
    if (this.fields.length > 1) {
      const obj: { [name: string]: z.ZodType } = {};
      for (const field of this.fields) {
        obj[field.name] = field.make_zod(ctx);
      }

      return this._required
        ? z.object(obj).array()
        : z.object(obj).array().optional();
    } else {
      return this._required
        ? this.fields[0].make_zod(ctx).array()
        : this.fields[0].make_zod(ctx).array().optional();
    }
  }
}

export const all_collections = (collections: CollectionBuilder[]) =>
  new CollectionsBuilder(collections);
export const folder_collection = (
  name: string,
  label: string,
  icon: string,
  folder: string,
  fields: FieldBuilder[],
) => new FolderBuilder(name, label, icon, folder, fields);
export const file_collection = (
  name: string,
  label: string,
  icon: string,
  files: FileBuilder[],
) => new FilesBuilder(name, label, icon, files);
export const file = (
  name: string,
  label: string,
  folder: string,
  file: string,
  fields: FieldBuilder[],
) => new FileBuilder(name, label, folder, file, fields);
export const divider = () => new DividerBuilder();

export const number_field = (name: string, label: string) =>
  new NumberBuilder(name, label);
export const string_field = (name: string, label: string) =>
  new StringBuilder(name, label);
export const text_field = (name: string, label: string) =>
  new TextBuilder(name, label);
export const markdown_field = (name: string, label: string) =>
  new MarkdownBuilder(name, label);
export const bool_field = (name: string, label: string) =>
  new BoolBuilder(name, label);
export const enum_field = (
  name: string,
  label: string,
  options: [string, string][],
) => new EnumBuilder(name, label, options);
export const datetime_field = (name: string, label: string) =>
  new DateTimeBuilder(name, label);
export const image_field = (name: string, label: string) =>
  new ImageBuilder(name, label);
export const object_field = (
  name: string,
  label: string,
  fields: FieldBuilder[],
) => new ObjectBuilder(name, label, fields);
export const list_field = (
  name: string,
  label: string,
  fields: FieldBuilder[],
) => new ListBuilder(name, label, fields);
