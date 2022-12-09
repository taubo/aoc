import logging

def log(log_msg):
    logging.getLogger().setLevel(logging.INFO)
    logging.info(f"Solution for day {day_number}, problem {prob_number}: {solution}")

def print_solution(day_number, prob_number, solution):
    print(f"Solution for day {day_number}, problem {prob_number}: {solution}")

def get_input_file(day_number):
    return "day" + str(day_number) + "/input"

def parse_input(filename, parser=None):
    with open(filename) as f:
        for line in f:
            parser.parse(line)

def parse_input_day(day_number, parser):
    parse_input(get_input_file(day_number), parser)
