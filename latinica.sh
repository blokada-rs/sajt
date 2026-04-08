#!/bin/sh

for dir in "src/content/vesti" "src/content/akcije" "src/content/afere" "src/content/stranice" "src/content/linkovi"
do
	rm -rf "$dir/sr-lat"
    mkdir -p "$dir/sr-lat"

    for file in "$dir"/sr/*
    do
        sed -e "y/[АБВГДЂЕЖЗИЈКЛМНОПРСТЋУФХЦЧШабвгдђежзијклмнопрстћуфхцчш]/[ABVGDĐEŽZIJKLMNOPRSTĆUFHCČŠabvgdđežzijklmnoprstćufhcčš]/" < "$file" \
            -e "s/Љ/Lj/g" \
            -e "s/Њ/Nj/g" \
            -e "s/Џ/Dž/g" \
            -e "s/љ/lj/g" \
            -e "s/њ/nj/g" \
            -e "s/џ/dž/g" \
            > "$dir/sr-lat/$(basename "$file")"
    done
done
