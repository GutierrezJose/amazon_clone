import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurchaseComponent } from './product-purchase.component';

describe('ProductPurchaseComponent', () => {
  let component: ProductPurchaseComponent;
  let fixture: ComponentFixture<ProductPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
