import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/user.dto';

jest.mock('./auth.service')

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /api/login login user', () => {

    const mockData = {
      usernameOrEmail: 'john_doe',
      password: '12345678',
    };
    
    describe('when this router is called', () => {

      beforeEach(async() => {
        await controller.login(mockData)
      })

      it('should called authService validateUser', () => {

        expect(service.validateUser).toHaveBeenCalledTimes(1);
        expect(service.validateUser).toHaveBeenCalledWith(mockData);
      })
    })
  });
});
