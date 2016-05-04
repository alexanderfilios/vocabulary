import { async, beforeEachProviders, describe, expect, inject, it } from '@angular/core/testing';
import { AuthService } from 'src/core/auth';
import { ProjectService } from './project-service';


describe('ProjectService', () => {
  beforeEachProviders(() => [AuthService, ProjectService]);

  it('should initialize an empty list', inject([ProjectService], service => {
    expect(Array.isArray(service.list)).toBe(true);
  }));

  it('should fetch projects if provided pin is correct', async(inject([ProjectService], service => {
    service.fetchProjects(1234)
      .then(list => {
        expect(list.length).toBe(2);
      });
  })));
});
