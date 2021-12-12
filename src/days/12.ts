import { groupByCount } from "./05";

type Network = Map<string, Array<string>>;

type Path = Array<string>;

export function parseInput(str: string): Network {
    return str.split("\n").reduce( (n, line) => {
        const [from, to] = line.split('-');
        n.set(from, (n.get(from) || []).concat(to));
        n.set(to, (n.get(to) || []).concat(from));
        return n;
    }, new Map<string, Array<string>>());
}

function* DFS(network: Network, currentPath?: Path): Generator<Path, void, boolean> {
    console.log(currentPath);
    const path = currentPath || ['start'];
    for (let el of network.get(path[path.length - 1]) || []) {
        const next = path.concat(el);
        if (yield next) {
            yield * DFS(network, next);
        }
    }
}

function smallCavesOnlyOnce(path: Path): boolean {
    const initial: [Set<string>, boolean] = [new Set<string>(), false];
    const regexp = new RegExp(/^[a-z]+$/);
    const lowerCase: (str: string) => boolean = (str) => regexp.test(str);
    return !path.reduce<typeof initial>(([visited, duplicate], current) => {
        const dup = duplicate || (lowerCase(current) && visited.has(current));
        return [visited.add(current), dup];
    }, initial)[1];
}

function singleSmallCaveAllowedTwice(path: Path): boolean {
    if (path.filter(s => s === 'start').length > 1) return false;
    if (path.filter(s => s === 'end').length > 1) return false;

    const regexp = new RegExp(/^[a-z]+$/);
    const lowerCase: (str: string) => boolean = (str) => regexp.test(str);

    const groupped = groupByCount(path, s => s, s => s).filter(([v, _c]) => lowerCase(v));

    return !(
        groupped.some(([s, v]) => s === 'start' && v > 1) ||
        groupped.some(([s, v]) => s === 'end' && v > 1) ||
        groupped.some(([s, v]) => v > 2) ||
        groupped.filter(([s, v]) => v > 1).length > 1
    );

}

export function firstHalf(network: Network): number {
    let paths = DFS(network);
    let count = 0;
    let candidate = paths.next();
    while (!candidate.done) {
        const valid = smallCavesOnlyOnce(candidate.value);
        const finishing = candidate.value[candidate.value.length - 1] === 'end';
        if (finishing) count++;

        candidate = paths.next(valid && !finishing);
    }
    return count;
}

export function secondHalf(network: Network): number {
    let paths = DFS(network);
    let count = 0;
    let candidate = paths.next();
    while (!candidate.done) {
        const valid = singleSmallCaveAllowedTwice(candidate.value);
        const finishing = candidate.value[candidate.value.length - 1] === 'end';
        if (finishing) count++;

        candidate = paths.next(valid && !finishing);
    }
    return count;
}
