import os
import logging
logging.getLogger().setLevel(logging.INFO)
os.sys.path.append("/mnt/d/devel/aoc/2022/")

import re
import libaoc as aoc
import numpy as np

class Parser():
    def __init__(self):
        # self.stacks = np.zeros((8, 10), dtype='str')
        self.stacks = {}
        self.instructions = []

    def get_data(self):
        return {'stack': self.stacks, 'instructions': self.instructions}

    def parse(self, line):
        if 'move' in line:
            line = line.strip()
            res = re.split('move | from | to', line)
            self.instructions.append(list(map(lambda x: int(x), res[1:])))
        elif line.isspace():
            return
        elif line[1].isnumeric():
            return
        else:
            space_count = 0
            last_elem = 0
            num_elem = 0

            line = line.replace('\n', '')
            res = re.split(' ', line)

            for e in res:
                if e == '':
                    space_count += 1
                else:
                    num_elem = int(space_count / 4)
                    last_elem += num_elem + 1
                    c = e.replace('[', '').replace(']', '')
                    # logging.debug(c)
                    if last_elem not in self.stacks.keys():
                        self.stacks[last_elem] = []
                    self.stacks[last_elem].append(c)
                    space_count = 0

def move_from_to(stack, move_count, from_index, to_index):
    temporary_stack = []
    logging.debug(f"moving {move_count} from {from_index} to {to_index}")
    logging.debug(f"before {stack=}")
    for i in range(1, move_count + 1):
        temporary_stack.append(stack[from_index].pop(0))
    temporary_stack.reverse()
    # logging.debug(f"{stack[to_index]=}")
    for elem in stack[to_index]:
        temporary_stack.append(elem)
    # logging.debug(f"{temporary_stack=}")
    stack[to_index] = temporary_stack
    logging.debug(f"after {stack=}")

def move_from_to_block(stack, move_count, from_index, to_index):
    temporary_stack = []
    logging.debug(f"moving {move_count} from {from_index} to {to_index}")
    logging.debug(f"before {stack=}")
    for i in range(1, move_count + 1):
        temporary_stack.append(stack[from_index].pop(0))
    # logging.debug(f"{stack[to_index]=}")
    for elem in stack[to_index]:
        temporary_stack.append(elem)
    # logging.debug(f"{temporary_stack=}")
    stack[to_index] = temporary_stack
    logging.debug(f"after {stack=}")

def prob1(data):
    solution = []
    instructions = data["instructions"]
    stacks = data["stack"]

    for instruction in instructions:
        # logging.debug(f"{instruction=}")
        move_count = instruction[0]
        from_index = instruction[1]
        to_index = instruction[2]
        move_from_to(stacks, move_count, from_index, to_index)

    logging.debug(f"stacks: {stacks=}")
    for i in range(1, len(stacks) + 1):
        # logging.debug(f"{s=}")
        solution.append(stacks[i].pop(0))
    return ''.join(solution)

def prob2(data):
    solution = []
    instructions = data["instructions"]
    stacks = data["stack"]

    for instruction in instructions:
        # logging.debug(f"{instruction=}")
        move_count = instruction[0]
        from_index = instruction[1]
        to_index = instruction[2]
        move_from_to_block(stacks, move_count, from_index, to_index)

    logging.debug(f"stacks: {stacks=}")
    for i in range(1, len(stacks) + 1):
        # logging.debug(f"{s=}")
        solution.append(stacks[i].pop(0))
    return ''.join(solution)

parser = Parser()
aoc.parse_input_day(5, parser)
# logging.debug(parser.get_data()["stack"])
sol1 = prob1(parser.get_data())

parser = Parser()
aoc.parse_input_day(5, parser)
sol2 = prob2(parser.get_data())

aoc.print_solution(5, 1, sol1)
aoc.print_solution(5, 2, sol2)
