import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/users.repository';
import { UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

jest.mock('./repository/users.repository')

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    })
      .compile();

    service = module.get<UsersService>(UsersService);
    repository= module.get<UsersRepository>(UsersRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  describe('when createUser is called', () => {
    
    const mockData = {
      username: 'john_doe',
      email: 'test@mail.com',
      password: '12345678',
    };

    beforeEach(async() => {
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashed123')
      await service.createUser(mockData)
    })

    it('should called usersRepository createUser', () => {

      expect(repository.createUser).toHaveBeenCalledTimes(1);
      expect(repository.createUser).toHaveBeenCalledWith({...mockData, password: 'hashed123'});
    })
  })

  describe('when findUser is called', () => {
    let user: UserDocument | null
    const mockData = {
      usernameOrEmail: 'john_doe',
      id: 'random_mongo_id',
    };

    beforeEach(async() => {
      (jest.spyOn(repository, 'findUser') as jest.MockInstance<any, any>).mockResolvedValue({
        username: 'john_doe',
        email: 'test@mail.com',
      });
      user = await service.findUser(mockData)
    })

    it('should called usersRepository findUser', () => {

      expect(repository.findUser).toHaveBeenCalledTimes(1);
      expect(repository.findUser).toHaveBeenCalledWith(mockData);
    })

    it('should return user from usersRepository findUser' , () => {
      
      expect(user).toEqual({
        username: 'john_doe',
        email: 'test@mail.com',
      })
    })
  })
});
