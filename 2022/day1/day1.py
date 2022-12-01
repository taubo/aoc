class Aoc():
    pass

def parse(filename):
    elfs = []
    with open(filename, 'r') as f:
        calories_list = []
        for line in f:
            if (line.isspace()):
                elfs.append(calories_list)
                calories_list = []
            else:
                calories_list.append(int(line))

    return elfs

def main():
    elfs = parse('/mnt/d/devel/aoc/2022/day1/input')
    max_calories = 0
    elf_with_max_calories = 0
    for elf_index, elem in enumerate(elfs):
        calories_sum = sum(elem)
        if calories_sum >= max_calories:
            max_calories = calories_sum
            elf_with_max_calories = elf_index

    print(f"{max_calories=} -- {elf_with_max_calories=}")


if __name__ == "__main__":
    main()
