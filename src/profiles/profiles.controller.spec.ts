import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { UserDocument } from 'src/users/schema/user.schema';
import { Types } from 'mongoose';
import { ProfileDto } from './dto/profile.dto';

jest.mock('./profiles.service')

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let service: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [ProfilesService]
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
    service = module.get<ProfilesService>(ProfilesService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const mockProfile = {
    name: 'john',
    gender: 'Male',
    birthday: (new Date()).toISOString(),
    height: 170,
    weight: 65
  } as const;

  const mockUser = {
    _id: 'abc123' as unknown as Types.ObjectId,
    username: 'john_doe',
    email: 'test@mail.com',
    password: '12345678',
  } as UserDocument

  describe('POST /api/createProfile create profile', () => {

    describe('when this router is called', () => {

      beforeEach(async() => {
        await controller.createProfile(mockUser, mockProfile)
      })

      it('should called profileService createProfile', () => {

        expect(service.createProfile).toHaveBeenCalledTimes(1);
        expect(service.createProfile).toHaveBeenCalledWith(mockProfile, mockUser);
      })
    })
  })

  describe('POST /api/getProfile get own profile', () => {

    describe('when this router is called', () => {

      let profile: ProfileDto

      beforeEach(async() => {
        jest.spyOn(service, 'getProfile').mockImplementation(async() => mockProfile)
        profile = await controller.getProfile(mockUser)
      })

      it('should called profileService getProfile', () => {

        expect(service.getProfile).toHaveBeenCalledTimes(1);
        expect(service.getProfile).toHaveBeenCalledWith(mockUser);
      })

      it('should return profileDto from profileService', () => {

        expect(profile).toEqual(mockProfile)
      })
    })
  })

  describe('PUT /api/updateProfile update profile', () => {
    
    describe('when this router is called', () => {
      let updatedProfile: ProfileDto
      beforeEach(async() => {
        jest.spyOn(service, 'updateProfile').mockImplementation(async() => mockProfile)
        updatedProfile = await controller.updateProfile(mockUser, mockProfile)
      })

      it('should called profileService createProfile', () => {

        expect(service.updateProfile).toHaveBeenCalledTimes(1);
        expect(service.updateProfile).toHaveBeenCalledWith(mockProfile, mockUser);
      })

      it('should return profileDto from profileService', () => {

        expect(updatedProfile).toEqual(mockProfile)
      })
    })
  })
});
