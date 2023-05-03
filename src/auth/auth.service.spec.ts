import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('src/users/users.service')
jest.mock('@nestjs/jwt')

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('when validateUser is called', () => {
    
    const mockData = {
      usernameOrEmail: 'john_doe',
      password: '12345678',
    };

    const mockUserData = {
      _id: 'asasasas' ,
      username: 'john_doe',
      password: 'hashed123'
    }

    jest.spyOn(bcrypt, 'compare')
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false)
    
    beforeEach(async() => {

      (jest.spyOn(usersService, 'findUser') as jest.MockInstance<any, any>).mockImplementationOnce(() => mockUserData)
      jest.spyOn(authService, 'createAccessToken').mockImplementation(async () => 'mock_access_token')
    })

    it('should called usersService findUser', async () => {

      await authService.validateUser(mockData)
      expect(usersService.findUser).toHaveBeenCalledTimes(1);
      expect(usersService.findUser).toHaveBeenCalledWith({ usernameOrEmail: mockData.usernameOrEmail});
    })

    it('should check password and createAccessToken', async () => {

      await authService.validateUser(mockData)
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalledWith(mockData.password, mockUserData.password);
      expect(authService.createAccessToken).toHaveBeenCalledTimes(1);
      expect(authService.createAccessToken).toHaveBeenCalledWith(mockUserData);
    })

    it('should not called createAccessToken if check password fails', async () => {
      
      try {
        await authService.validateUser(mockData)
      } catch (error) {
        expect(authService.createAccessToken).not.toHaveBeenCalledTimes(1);
        expect(authService.createAccessToken).not.toHaveBeenCalledWith(mockData);
        expect(error.message).toEqual("Username/Email or Password is wrong")
      }
    })
  })
});
