import { Query } from "./query/query";

export class NavigationMenu {
    Name: string;
    Children: NavigationMenu[];
    Icon: string;
    Query: Query;
    
    constructor() { }
}

