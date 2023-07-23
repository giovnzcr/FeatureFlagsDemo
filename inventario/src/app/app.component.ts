import { Component, OnInit } from '@angular/core';
import { InventarioService } from './inventario.service';
import { Item } from './items.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  items= new Array<Item>();
  constructor(private servicioInventario: InventarioService) {

    
  }
  ngOnInit(): void {
    this.servicioInventario.generateInventory();
    this.items = this.servicioInventario.getinventory();
  }
  title = 'Inventario @ Angular CR';
  
}
