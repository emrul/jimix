import {observable, observe} from "mobx/lib/mobx";
import {MBean} from "./MBean";
import {Inventory} from "./Inventory";


export class AppState {
	@observable inventory: Inventory = new Inventory();

	async loadInventory() {
		let response = await window.fetch('api/inventory');
		let inventory = await response.json();
		var i = 0;
		for(i = 0; i < inventory.mbeans.length; i++) {
			var newbean = new MBean();
			var oldbean = inventory.mbeans[i];
			newbean.objectName = oldbean.objectName;
			inventory.mbeans[i] = newbean;
		}
		this.inventory = inventory;
	}
}
