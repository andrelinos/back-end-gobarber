import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  // it('should be able to list the day availability from provider', async () => {
  //   const currentDateMock = new Date(2020, 10, 30, 8, 0, 0); // data fixa do servidor: 01/30/2020 8h
  //   jest.spyOn(Date, 'now').mockReturnValue(currentDateMock.getTime());


  //   await fakeAppointmentsRepository.create({
  //     provider_id: 'user',
  //     date: new Date(2020, 10, 20, 8, 0, 0),
  //   });

  //   await fakeAppointmentsRepository.create({
  //     provider_id: 'user',
  //     date: new Date(2020, 10, 20, 9, 0, 0),
  //   });



  //   const availability = await listProviderDayAvailability.execute({
  //     provider_id: 'user',
  //     month: 10,
  //     year: 2020,
  //     day: 20,
  //   });

  //   expect(availability).toEqual(
  //     expect.arrayContaining([
  //       { hour: 8, available: false },
  //       { hour: 9, available: true },
  //       { hour: 10, available: false },
  //       { hour: 11, available: true },
  //     ]),
  //   );
  // });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      // user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      // user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime()
    })

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    )
  })
});
