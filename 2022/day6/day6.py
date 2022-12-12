import os
import logging
logging.getLogger().setLevel(logging.INFO)
os.sys.path.append("/mnt/d/devel/aoc/2022/")

import libaoc as aoc

def find_unique_sequence(input_string, window_size):
    window = []
    for index, character in enumerate(input_string):

        while character in window:
            window.pop(0)
        window.append(character)

        logging.debug(f"{window=}")

        if len(window) == window_size:
            return index + 1

def prob1(data):
    index = find_unique_sequence(data, 4)
    logging.debug(index)
    return index

def prob2(data):
    index = find_unique_sequence(data, 14)
    return index

parser = aoc.DefaultParser()

aoc.parse_input_day(6, parser)
sol1 = prob1(parser.get_data()[0])
sol2 = prob2(parser.get_data()[0])
aoc.print_solution(6, 1, sol1)
aoc.print_solution(6, 2, sol2)
