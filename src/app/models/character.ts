import { Origin } from "./origin";

export class Character {
    public id: number = 0;
    public name: string = '';
    public status: string = '';
    public species: string = '';
    public type: string = '';
    public gender: string = '';
    public origin: Origin | undefined;
    public location: Origin | undefined;
    public image: string = '';
    public episode: string[] = [];
    public url: string = '';
    public created: Date | undefined;
}