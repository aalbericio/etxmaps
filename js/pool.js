
function Pool(){
    this._items = [];
}

Pool.prototype.containsItem = function(id){
    return this._items[id] !== undefined;
}

Pool.prototype.getItem = function(id){
    return this._items[id];
}

Pool.prototype.setItem = function(id, item){
    this._items[id] = item;
}

Pool.prototype.getItems = function(){
    return this._items;
}

Pool.prototype.setItems = function(items){
    this._items = items;
}

Pool.prototype.clear = function(){
    this._items = [];
}