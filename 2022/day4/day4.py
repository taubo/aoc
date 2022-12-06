import os
import logging
logging.getLogger().setLevel(logging.DEBUG)
os.sys.path.append("/mnt/d/devel/aoc/2022/")

import libaoc as aoc

class Parser():
    def __init__(self):
        self.section_assignment = []

    def get_data(self):
        return self.section_assignment

    def parse(self, line):
        line = line.strip()
        res = list(map(lambda elem: elem.split("-"), line.split(",")))
        r = []
        for elem in res:
            res = list(map(lambda elem: int(elem), elem))
            r.append(res)
        self.section_assignment.append(r)

parser = Parser()

def prob1(data):
    count = 0

    for elem in data:
        logging.debug(f"{elem=}")
        diff1 = elem[0][0] - elem[1][0]
        diff2 = elem[0][1] - elem[1][1]
        logging.debug(f"{diff1=} - {diff2}")
        if (diff1 >= 0 and diff2 <= 0) or (diff1 <= 0 and diff2 >= 0):
            count += 1

    return count


aoc.parse_input(aoc.get_input_file(4), parser)
logging.debug(parser.get_data())
p1_solution = prob1(parser.get_data())
aoc.print_solution(4, 1, p1_solution)
