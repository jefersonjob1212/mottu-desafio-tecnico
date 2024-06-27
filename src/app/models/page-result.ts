export class PageResult<T> {
    public info: Info | undefined;
    public results: T[] = [];
}

export class Info {
    public count: number = 0;
    public pages: number = 0;
    public next: string = '';
    public prev?: string;
}