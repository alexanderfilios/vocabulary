import { describe, expect, it, beforeEachProviders, inject, injectAsync } from 'angular2/testing';
import { AuthService } from 'src/core/auth';
import { ProjectService } from './project-service';


describe('ProjectService', () => {
  beforeEachProviders(() => [AuthService, ProjectService]);

  it('should initialize an empty list', inject([ProjectService], service => {
    expect(Array.isArray(service.list)).toBe(true);
  }));

  it('should fetch projects if provided pin is correct', injectAsync([ProjectService], service => {
    return new Promise(resolve => {
      service.fetchProjects(1234)
        .then(list => {
          expect(list.length).toBe(2);
          resolve();
        });
    });
  }));
});
