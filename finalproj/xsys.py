#! /usr/bin/env python3

from plothouse import ds
import json
import sys

if __name__ == '__main__':
    json.dump([
        {'x': x, 'y': y} for x, y in zip(*ds())
    ], sys.stdout)

# ./xsys.py | jq . > site/prices.json
