import { Component, OnInit } from '@angular/core';
import { InventarioService } from './inventario.service';
import { Item } from './items.model';
import { LaunchDarklyService } from './launch-darkly.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected borrarInventarioActivo$: any

  items= new Array<Item>();
  constructor(private servicioInventario: InventarioService,
    private ldService: LaunchDarklyService) {

    
  }
  ngOnInit(): void {
    this.servicioInventario.generateInventory();
    this.items = this.servicioInventario.getinventory();
    this.borrarInventarioActivo$ =  this.ldService.queryFlag('borrar-inventario-ui')
   
  }
  title = 'Inventario @ Angular CR';
  
}
