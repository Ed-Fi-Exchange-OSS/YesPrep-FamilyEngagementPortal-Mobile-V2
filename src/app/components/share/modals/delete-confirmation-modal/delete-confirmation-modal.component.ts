import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';

@Component({
  selector: 'confirm-button',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {

  @Input() index: any;
  @Input() model: any;
  @Output() onModelChange = new EventEmitter();
  @Input() executeAfterDelete;

  constructor(
    private modalService: NgbModal, 
    private _cd: ChangeDetectorRef,
    private _confirmationService: ConfirmationService) { }

  openModal(confirmDelete) {
    this.modalService.open(confirmDelete);
    
  }
  delete(index){
    if(confirm("Do you want to delete this Telephone Number?")){
      this.model.splice(index, 1); 
      this.onModelChange.emit(this.model);
      if(this.executeAfterDelete) {
        this.executeAfterDelete();
        this.detectChanges();
      }
    }
  }
  private detectChanges(): void {
    setTimeout(()=> {
      this._cd.markForCheck();
      this._cd.detectChanges();
    },100);
    this._confirmationService.confirmed(this.model);
  }
}
