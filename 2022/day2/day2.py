import argparse

class AOC():
    def __init__(self, day):
        self.day = day

    def parse(self, input_file):
        file_content = []
        with open(input_file) as f:
            for line in f:
                play = line.split()
                file_content.append(play)

        return file_content

    def prob1(self, problem_data):
        solution = None

        prob_rules = {
                ('A', 'X'): 1,
                ('A', 'Y'): 2,
                ('A', 'Z'): 0,
                ('B', 'X'): 0,
                ('B', 'Y'): 1,
                ('B', 'Z'): 2,
                ('C', 'X'): 2,
                ('C', 'Y'): 0,
                ('C', 'Z'): 1
                }

        p2_map = {
                'X': 1,
                'Y': 2,
                'Z': 3
                }

        scores = []
        for round_match in problem_data:
            scores.append(score(round_match[0], round_match[1], p2_map, prob_rules))

        solution = sum(scores)

        if solution is not None:
            print(f"Solution for problem 1, day {self.day}: {solution}")

    def prob2(self, problem_data):
        solution = None

        prob_rules = {
                ('A', 'C'): 0,
                ('A', 'A'): 1,
                ('A', 'B'): 2,
                ('B', 'A'): 0,
                ('B', 'B'): 1,
                ('B', 'C'): 2,
                ('C', 'B'): 0,
                ('C', 'C'): 1,
                ('C', 'A'): 2
                }

        p2_selection = {
                ('A', 'X'): 'C',
                ('A', 'Y'): 'A',
                ('A', 'Z'): 'B',
                ('B', 'X'): 'A',
                ('B', 'Y'): 'B',
                ('B', 'Z'): 'C',
                ('C', 'X'): 'B',
                ('C', 'Y'): 'C',
                ('C', 'Z'): 'A'
                }

        selection_score = {
                'A': 1,
                'B': 2,
                'C': 3
                }

        scores = []
        for round_match in problem_data:
            p2_map = {}
            scores.append(score(round_match[0], p2_selection[(round_match[0], round_match[1])], selection_score, prob_rules))

        solution = sum(scores)

        if solution is not None:
            print(f"Solution for problem 2, day {self.day}: {solution}")

def score(p1_choice, p2_choice, choice_score, rules):
    return choice_score[p2_choice] + 3 * rules[(p1_choice, p2_choice)]

def main():
    argument_parser = argparse.ArgumentParser()
    argument_parser.add_argument('cmd')
    argument_parser.add_argument('day_number')
    args = argument_parser.parse_args()

    if args.cmd == 'run':
        aoc = AOC(args.day_number)
        data = aoc.parse('day' + args.day_number + '/input')
        aoc.prob1(data)
        aoc.prob2(data)

if __name__ == "__main__":
    main()
