import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BaseComponent } from "./base.component";

describe("BaseComponent", () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call activate when ngOnInit", () => {
    const spy = spyOn(component, "activate");
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it("should call update when ngOnChanges", () => {
    const spy = spyOn(component, "update");
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should call dispose when ngOnDestroy", () => {
    const spy = spyOn(component, "dispose");
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
