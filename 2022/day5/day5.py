import os
import logging
logging.getLogger().setLevel(logging.DEBUG)
os.sys.path.append("/mnt/d/devel/aoc/2022/")

import re
import libaoc as aoc
import numpy as np

class Parser():
    def __init__(self):
        self.stacks = np.zeros((8, 10), dtype='str')
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
                    # logging.debug(f"{space_count=} -- {num_elem=} -- {last_elem=}")
                    c = e.replace('[', '').replace(']', '')
                    logging.debug(c)
                    self.stacks[0][last_elem - 1] = c
                    # self.stacks[last_elem] = e.replace('[ | ]', '')
                    space_count = 0

parser = Parser()
aoc.parse_input_day(5, parser)
logging.debug(parser.get_data())
