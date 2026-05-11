import {
    type Collection,
    type Field,
    type StringField,
    type BooleanField,
    type SelectField,
    type DateTimeField,
    type ImageField,
    type ObjectField,
    type CollectionDivider,
    type CollectionFile,
    type ListField,
    type NumberField,
    type I18nOptions
} from '@sveltia/cms';

export type I18N = boolean | "duplicate" | "translate" | "none";

class FolderBuilder {
    constructor(
        private name: string,
        private label: string,
        private icon: string,
        private folder: string,
        private fields: FieldBuilder[],
    ) {}

    protected _slug: string | undefined;
    slug(value: string) { this._slug = value; return this }

    protected _sort_by: string | undefined;
    sort_by(value: string) { this._sort_by = value; return this }

    protected _create: boolean = true;
    create(value: boolean) { this._create = value; return this }

    protected _i18n: boolean | I18nOptions = true;
    i18n(value: boolean | I18nOptions) { this._i18n = value; return this }

    make(): Collection {
        return {
            name: this.name,
            label: this.label,
            icon: this.icon,
            folder: this.folder,
            slug: this._slug,
            fields: this.fields.map(field => field.make()),
            create: this._create,
            i18n: this._i18n,
            sortable_fields: typeof this._sort_by !== "undefined" ? {
                fields: [this._sort_by],
                default: {
                    field: this._sort_by,
                    direction: "descending"
                }
            } : undefined
        }
    }
}

class FileBuilder {
    constructor(
        private name: string,
        private label: string,
        private file: string,
        private fields: FieldBuilder[],
    ) {}

    protected _i18n: boolean = true;
    i18n(value: boolean) { this._i18n = value; return this }

    make(): CollectionFile {
        return {
            name: this.name,
            label: this.label,
            file: this.file,
            fields: this.fields.map(field => field.make()),
            i18n: this._i18n,
        }
    }
}

class FilesBuilder {
    constructor(
        private name: string,
        private label: string,
        private icon: string,
        private files: FileBuilder[]
    ) {}

    protected _i18n: boolean = true;
    i18n(value: boolean) { this._i18n = value; return this }

    make(): Collection {
        return {
            name: this.name,
            label: this.label,
            icon: this.icon,
            files: this.files.map(file => file.make()),
            i18n: this._i18n,
        }
    }
}

class FieldBuilder {
    constructor(
        protected name: string,
        protected label: string,
        protected widget: string
    ) {}

    protected _required: boolean = true;
    required(value: boolean) { this._required = value; return this }

    protected _i18n: I18N = true;
    i18n(value: I18N) { this._i18n = value; return this }

    make(): Field {
        return {
            widget: this.widget,
            name: this.name,
            label: this.label,
            required: this._required,
            i18n: this._i18n,
        }
    }
}

export class StringBuilder extends FieldBuilder {
    constructor(name: string, label: string) {
        super(name, label, "string");
    }

    protected _url: boolean = false;
    url(value: boolean) { this._url = value; return this }

    make(): StringField {
        return {
            ...(super.make() as StringField),
            type: this._url? "url" : "text"
        };
    }
}

class TextBuilder extends FieldBuilder {
    constructor(name: string, label: string) {
        super(name, label, "text");
    }
}

class MarkdownBuilder extends FieldBuilder {
    constructor(name: string, label: string) {
        super(name, label, "markdown");
    }
}

type ValueType = "float" | "int" | "int/string" | "float/string" | undefined;
class NumberBuilder extends FieldBuilder {
    constructor(name: string, label: string) {
        super(name, label, "number");
    }

    protected _default: number | undefined;
    default(value: number) { this._default = value; return this }

    protected _type: ValueType = "float"
    type(value: ValueType) { this._type = value; return this }

    make(): NumberField {
        return {
            ...(super.make() as NumberField),
            default: this._default,
            value_type: this._type
        };
    }
}

class BoolBuilder extends FieldBuilder {
    constructor(name: string, label: string) {
        super(name, label, "boolean");
    }

    protected _default: boolean | undefined;
    default(value: boolean) { this._default = value; return this }

    make(): BooleanField {
        return {
            ...(super.make() as BooleanField),
            default: this._default,
            i18n: "duplicate"
        };
    }
}

class EnumBuilder extends FieldBuilder {
    constructor(name: string, label: string, private options: [string, string][]) {
        super(name, label, "select");
    }

    make(): SelectField {
        return {
            ...(super.make() as SelectField),
            options: this.options.map(([value, label]) => ({value, label})),
            default: this.options[0][0],
        };
    }
}

class DateTimeBuilder extends FieldBuilder {
    constructor(name: string, label: string) {
        super(name, label, "datetime");
    }

    protected _default: string = "{{now}}";
    default(value: string) { this._default = value; return this }

    make(): DateTimeField {
        return {
            ...(super.make() as DateTimeField),
            default: this._default,
            i18n: "duplicate",
            picker_utc: true
        };
    }
}

class ImageBuilder extends FieldBuilder {
    constructor(name: string, label: string) {
        super(name, label, "image");
    }

    make(): ImageField {
        return {
            ...(super.make() as ImageField),
            i18n: "duplicate",
        };
    }
}

class ObjectBuilder extends FieldBuilder {
    constructor(name: string, label: string, private fields: FieldBuilder[]) {
        super(name, label, "object");
    }

    make(): ObjectField {
        return {
            ...(super.make() as ObjectField),
            fields: this.fields.map((field) => field.make()),
        };
    }
}

class ListBuilder extends FieldBuilder {
    constructor(name: string, label: string, private fields: FieldBuilder[]) {
        super(name, label, "list");
    }

    protected _singular: string | undefined;
    singular(value: string) { this._singular = value; return this }

    protected _summary: string | undefined;
    summary(value: string) { this._summary = value; return this }

    protected _add_to_top: boolean = false;
    add_to_top() { this._add_to_top = true; return this }

    make(): ListField {
        return {
            ...(super.make() as ListField),
            fields: this.fields.map((field) => field.make()),
            label_singular: this._singular,
            add_to_top: this._add_to_top,
            summary: this._summary
        };
    }
}

export const folder_collection = (name: string, label: string, icon: string, folder: string, fields: FieldBuilder[]) => new FolderBuilder(name, label, icon, folder, fields)
export const file_collection = (name: string, label: string, icon: string, files: FileBuilder[]) => new FilesBuilder(name, label, icon, files)
export const file = (name: string, label: string, file: string, fields: FieldBuilder[]) => new FileBuilder(name, label, file, fields)

export const number_field = (name: string, label: string) => new NumberBuilder(name, label)
export const string_field = (name: string, label: string) => new StringBuilder(name, label)
export const text_field = (name: string, label: string) => new TextBuilder(name, label)
export const markdown_field = (name: string, label: string) => new MarkdownBuilder(name, label)
export const bool_field = (name: string, label: string) => new BoolBuilder(name, label)
export const enum_field = (name: string, label: string, options: [string, string][]) => new EnumBuilder(name, label, options)
export const datetime_field = (name: string, label: string) => new DateTimeBuilder(name, label)
export const image_field = (name: string, label: string) => new ImageBuilder(name, label)
export const object_field = (name: string, label: string, fields: FieldBuilder[]) => new ObjectBuilder(name, label, fields)
export const list_field = (name: string, label: string, fields: FieldBuilder[])=> new ListBuilder(name, label, fields)

export const divider = (): CollectionDivider => ({
    divider: true
})
