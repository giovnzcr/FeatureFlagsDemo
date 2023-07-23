import { Injectable } from '@angular/core';
import { Item } from './items.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  items: Item[] = [];

   sampleNames: string[] = [
    'Widget',
    'Gadget',
    'Thingamajig',
    'Doohickey',
    'Contraption',
    'Whatchamacallit',
    'Doodad',
    'Apparatus',
    'Gizmo',
    'Invention'
  ];
   sampleDescriptions: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Suspendisse euismod dolor eu elit eleifend, nec elementum ex pulvinar.',
    'Fusce luctus odio quis sapien cursus, nec finibus dolor dignissim.',
    'Vestibulum at augue aliquam, luctus purus quis, eleifend magna.',
    'Integer nec nunc eu sapien cursus rhoncus.',
    'Praesent vitae tellus vel tellus bibendum finibus.',
    'Nulla vel ligula a eros dictum volutpat.',
    'Etiam vulputate neque sit amet odio suscipit, eu tincidunt libero tincidunt.',
    'Duis id dui id odio faucibus ultrices.',
    'Aenean eget tellus vitae felis egestas vestibulum.',
  ];

  constructor() { }

  getinventory(){
    return this.items;
  }

  generateInventory(): void {
    for (let i = 0; i < 10; i++) {
      const randomNameIndex = Math.floor(Math.random() * this.sampleNames.length);
      const randomDescriptionIndex = Math.floor(Math.random() * this.sampleDescriptions.length);

      const item: Item = {
        name: this.sampleNames[randomNameIndex],
        description: this.sampleDescriptions[randomDescriptionIndex],
        imageURL: this.generateRandomImageURL() // Replace this with actual image URLs later
      };

      this.items.push(item);
    }
  }


  generateRandomImageURL(): string {
    return "https://picsum.photos/300"; // Placeholder URL
  }
}
