import { TestBed } from '@angular/core/testing';
import { JobOfferService } from './job-offer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('JobOfferService', () => {
  let service: JobOfferService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobOfferService]
    });

    service = TestBed.inject(JobOfferService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an offer', () => {
    const mockOffer = { titre: 'Dev', lieu: 'Paris', avis_favorable: true, description: '...' };

    service.creerOffre(mockOffer).subscribe(res => {
      expect(res).toEqual(mockOffer);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/booking-request');
    expect(req.request.method).toBe('POST');
    req.flush(mockOffer);
  });

  it('should authenticate', () => {
    const mockCredentials = { username: 'test', password: 'pass' };
    const mockResponse = { token: 'testToken' };

    service.authentification(mockCredentials).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/authentification');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return offers based on search', () => {
    const offres = service.rechercherOffres('Développeur Web', 'Paris');
    expect(offres.length).toBeGreaterThan(0);
  });

  it('should get favorable offers', () => {
    const offres = service.getOffresFavorables();
    expect(offres.length).toBeGreaterThan(0);
    offres.forEach(offre => {
      expect(offre.avis_favorable).toBeTrue();
    });
  });

});
