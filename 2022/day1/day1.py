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

def prob1(calories_sum):
    max_calories=calories_sum[0]
    prob1_solution=max_calories
    print(f"{prob1_solution=}")

def prob2(calories_sum):
    prob2_solution=sum(calories_sum[0:3])
    print(f"{prob2_solution=}")

def main():
    elfs = parse('/mnt/d/devel/aoc/2022/day1/input')

    calories_sum = []
    for elf_index, elem in enumerate(elfs):
        calories_sum.append(sum(elem))
    calories_sum.sort(reverse=True)

    prob1(calories_sum)
    prob2(calories_sum)

if __name__ == "__main__":
    main()
