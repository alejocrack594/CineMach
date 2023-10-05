export class Movie {
    id: number;
    title: string;
    description: string;
    duration: string;
    rating: string;
    image: string | undefined;

    constructor(id: number, title: string, description: string, duration: string, rating: string, image: string | undefined) {
         this.id = id;
         this.title = title;
         this.description = description;
         this.duration = duration;
         this.rating = rating;
         this.image = image;       
    }
}