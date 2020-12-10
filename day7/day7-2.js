const fs = require('fs')

const rules = fs.readFileSync(process.stdin.fd, 'utf8').split(/\r?\n/);

let nodesMap = new Map();
for (let rule of rules) {
    let [, parentName, childList] = rule.match(/(.*) bags contain (.*)\./);
    let parentNode = nodesMap.get(parentName);
    if (parentNode == null) {
        parentNode = {
            name: parentName,
            children: [],
            parents: []
        };
        nodesMap.set(parentName, parentNode);
    }
    if (childList == 'no other bags') {
        continue;
    }
    for (let child of childList.split(', ')) {
        let [, childCount, childName] = child.match(/(\d+) (.*) bag/);
        let childNode = nodesMap.get(childName);
        if (childNode == null) {
            childNode = {
                name: childName,
                children: [],
                parents: []
            };
            nodesMap.set(childName, childNode);
        }
        parentNode.children.push({
            count: childCount,
            node: childNode
        });
        childNode.parents.push(parentNode);
    }
}

// console.log(nodesMap);

console.log(bagCount(nodesMap.get('shiny gold')) - 1);

function bagCount(node) {
    let count = 1;
    for (let c of node.children) {
        count += c.count * bagCount(c.node);
    }
    return count;
}