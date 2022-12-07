import { TestBed } from '@angular/core/testing';

import { IsCurrentUserGuard } from './is-current-user.guard';

describe('IsCurrentUserGuard', () => {
  let guard: IsCurrentUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsCurrentUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
