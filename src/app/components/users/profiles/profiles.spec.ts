import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profiles } from './profiles';

describe('Profiles', () => {
  let component: Profiles;
  let fixture: ComponentFixture<Profiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
