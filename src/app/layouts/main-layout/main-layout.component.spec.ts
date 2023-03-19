import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainLayoutComponent } from "./main-layout.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AppRoutingModule } from "../../app-routing.module";

describe("MainLayoutComponent", () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [MainLayoutComponent, NavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
