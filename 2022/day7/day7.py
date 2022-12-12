import os
import logging
logging.getLogger().setLevel(logging.DEBUG)
os.sys.path.append("/mnt/d/devel/aoc/2022/")

import libaoc as aoc

class Parser():
    def __init__(self):
        self.filesystem = None
        self.current_directory = None
        self.previous_directory = []

    def get_data(self):
        pass

    def parse_cd(self, sub_command):
        # logging.debug(f"parse_cd: {sub_command}")
        if sub_command == '..':
            self.current_directory = self.previous_directory.pop(-1)
        else:
            self.previous_directory.append(self.current_directory)
            self.current_directory = sub_command

    def parse(self, line):
        line = line.strip()
        tokens = line.split(' ')
        # logging.debug(f"{tokens=}")

        if (tokens[0] == '$'):
            if (tokens[1] == 'cd'):
                self.parse_cd(tokens[2])
                logging.debug(f"{self.current_directory=}")
                logging.debug(f"{self.previous_directory=}")
        elif (tokens[0] == 'dir'):
            logging.debug('dir')
            # direcotry node
        else:
            logging.debug('file')
            # file node

parser = Parser()
aoc.parse_input_day(7, parser)
logging.debug(parser.get_data())
