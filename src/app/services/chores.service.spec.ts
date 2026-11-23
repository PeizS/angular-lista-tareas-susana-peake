import { TestBed } from '@angular/core/testing';
import { Chores } from './chores.service';

describe('Chores', () => {
  let service: Chores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
