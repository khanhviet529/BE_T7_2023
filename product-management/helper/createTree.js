let count = 0;
function Tree(arr, parentId = "") {
  const tree = [];
  (arr).forEach(item => {
    if (item.parent_id === parentId) {
      let newItem = item;
      count++;
      newItem.index = count;
      const children = Tree(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

module.exports.createTree = (arr, parentId = "") => {
  count = 0;
  const newRecords = Tree(arr);
  return newRecords;
}