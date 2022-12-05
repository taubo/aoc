import os
import logging
logging.getLogger().setLevel(logging.DEBUG)
os.sys.path.append("/mnt/d/devel/aoc/2022/")

import libaoc as aoc

class Parser():
    def __init__(self):
        self.rucksacks = []

    def get_data(self):
        return self.rucksacks

    def parse(self, line):
        line = str.strip(line)
        compart1 = line[0:int(len(line) / 2)]
        compart2 = line[int(len(line) / 2): len(line)]
        self.rucksacks.append((compart1, compart2))

def find_repeated(str1, str2):
    string_set = set(str1)
    for character in str2:
        if character in string_set:
            return character

parser = Parser()

aoc.parse_input(aoc.get_input_file(3), parser)
logging.debug(parser.get_data())

priority_sum = 0

for (str1, str2) in parser.get_data():
    logging.debug(f"{str1=} -- {str2=}")
    repeated = find_repeated(str1, str2)
    logging.debug(f"{repeated=}")

    if (repeated.islower()):
        priority = ord(repeated) - 97 + 1
    elif (repeated.isupper()):
        priority = ord(repeated) - 65 + 1 + 26

    priority_sum += priority

aoc.print_solution(3, 1, priority_sum)
