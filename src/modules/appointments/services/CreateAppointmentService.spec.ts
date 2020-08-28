import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '114545644654',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('114545644654');
  });

  it('you should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '114545644654',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '114545644655',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
