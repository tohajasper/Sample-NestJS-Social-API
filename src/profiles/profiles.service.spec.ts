import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { ProfileRepository } from './repository/profiles.repository';
import { Types } from 'mongoose';
import { UserDocument } from 'src/users/schema/user.schema';
import { ProfileDto } from './dto/profile.dto';

jest.mock('./repository/profiles.repository')

describe('ProfilesService', () => {
  let service: ProfilesService;
  let repository: ProfileRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesService, ProfileRepository],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    repository = module.get<ProfileRepository>(ProfileRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

  describe('when createProfile is called', () => {
    
    beforeEach(async() => {
      await service.createProfile(mockProfile, mockUser)
    })

    it('should called profileRepository createProfile', () => {

      expect(repository.createProfile).toHaveBeenCalledTimes(1);
      expect(repository.createProfile).toHaveBeenCalledWith(mockProfile, mockUser);
    })
  })

  describe('when getProfile is called', () => {
    
    let profile: ProfileDto
    let spyon: jest.MockInstance<any, any, any>;
    beforeEach(()=> {
      spyon = (jest.spyOn(repository, 'findProfileByUserId') as jest.MockInstance<any, any>)
        .mockResolvedValue(mockProfile)
    })

    it('should called profileRepository findProfileByUserId', async () => {

      profile = await service.getProfile(mockUser)
      expect(repository.findProfileByUserId).toHaveBeenCalledTimes(1);
      expect(repository.findProfileByUserId).toHaveBeenCalledWith(mockUser._id);
    })

    it('should return profileDto if exists', async() => {

      profile = await service.getProfile(mockUser)
      expect(profile).toEqual(mockProfile);
    })

    it('should throw err if not exists', async () => {
      spyon = spyon.mockResolvedValue(null)
      try {
        profile = await service.getProfile(mockUser)
        expect(profile).toThrow()
      } catch (error) {
        expect(error.message).toEqual('Profile Not Found')
      }
    })
  })

  describe('when updateProfile is called', () => {

    const updatedMockProfile = {
      ...mockProfile,
      weight: 100
    }
    
    let updatedProfile: ProfileDto
    let spyon: jest.MockInstance<any, any, any>;
    beforeEach(()=> {
      spyon = (jest.spyOn(repository, 'updateProfile') as jest.MockInstance<any, any>)
        .mockResolvedValue(updatedMockProfile)
    })

    it('should called profileRepository updateProfile', async () => {

      await service.updateProfile(updatedMockProfile, mockUser)
      expect(repository.updateProfile).toHaveBeenCalledTimes(1);
      expect(repository.updateProfile).toHaveBeenCalledWith(updatedMockProfile, mockUser._id);
    })

    it('should return updated profileDto', async() => {

      updatedProfile = await service.updateProfile(updatedMockProfile, mockUser)
      expect(updatedProfile).toEqual(updatedMockProfile);
      expect(mockProfile.weight).not.toEqual(updatedMockProfile.weight);
    })
  })
});
