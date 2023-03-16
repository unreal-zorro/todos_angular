import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { AppRoutingModule } from "../../app-routing.module";
import { NavbarComponent } from "./navbar.component";
import { provideRouter, Router, RouterLink } from "@angular/router";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let linksDes: DebugElement[];
  let routerLinks: RouterLink[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [NavbarComponent],
      providers: [provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    linksDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linksDes.map(de => de.injector.get(RouterLink));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should value of property height = navbar height", () => {
    const NavbarEl: HTMLElement = fixture.nativeElement;
    const div = NavbarEl.querySelector("div.bg-success.position-absolute");
    if (div) {
      expect(component.height).toBe(div.clientHeight);
    }
  });

  it("should get RouterLinks from template", () => {
    expect(routerLinks.length).withContext("should have 4 routerLinks").toBe(4);
    expect(routerLinks[0].href).toBe("/");
    expect(routerLinks[1].href).toBe("/");
    expect(routerLinks[2].href).toBe("/notes");
    expect(routerLinks[3].href).toBe("/new");
  });

  it("should change address after click on link 0", fakeAsync(() => {
    const notesLink = linksDes[0];
    TestBed.inject(Router).resetConfig([{ path: "**", children: [] }]);
    notesLink.triggerEventHandler("click", { button: 0 });
    tick();
    fixture.detectChanges();
    expect(TestBed.inject(Router).url).toBe("/");
  }));

  it("should change address after click on link 1", fakeAsync(() => {
    const notesLink = linksDes[1];
    TestBed.inject(Router).resetConfig([{ path: "**", children: [] }]);
    notesLink.triggerEventHandler("click", { button: 0 });
    tick();
    fixture.detectChanges();
    expect(TestBed.inject(Router).url).toBe("/");
  }));

  it("should change address after click on link 2", fakeAsync(() => {
    const notesLink = linksDes[2];
    TestBed.inject(Router).resetConfig([{ path: "**", children: [] }]);
    notesLink.triggerEventHandler("click", { button: 0 });
    tick();
    fixture.detectChanges();
    expect(TestBed.inject(Router).url).toBe("/notes");
  }));

  it("should change address after click on link 3", fakeAsync(() => {
    const notesLink = linksDes[3];
    TestBed.inject(Router).resetConfig([{ path: "**", children: [] }]);
    notesLink.triggerEventHandler("click", { button: 0 });
    tick();
    fixture.detectChanges();
    expect(TestBed.inject(Router).url).toBe("/new");
  }));
});
