import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/user.dto';

jest.mock('./users.service')

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/api/post register user', () => {

    const mockData = {
      username: 'john_doe',
      email: 'test@mail.com',
      password: '12345678',
    };
    
    describe('when this router is called', () => {

      beforeEach(async() => {
        await controller.register(mockData)
      })

      it('should called usersservice createUser', () => {

        expect(service.createUser).toHaveBeenCalledTimes(1);
        expect(service.createUser).toHaveBeenCalledWith(mockData);
      })
    })

    describe('RegisterUserDto validation', () => {

      let target: ValidationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
      });
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: RegisterUserDto,
      };
  
      it('should register a new user under correct input', async () => {
        const inputData = { ...mockData }
        expect(
          await target.transform(<RegisterUserDto>{ ...inputData }, metadata),
        ).toEqual(inputData);
      });
  
      it('should failed under incorrect username length', async () => {
        const inputData = {
          ...mockData,
          username: 'john_doeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        };
        await target.transform(<RegisterUserDto>{ ...inputData }, metadata)
        .catch((err) => {
          expect(err.getResponse().message).toEqual(['username must be shorter than or equal to 20 characters']);
        });
      });
  
      it('should failed under incorrect email', async () => {
        const inputData = {
          ...mockData,
          email: 'testmail.com',
        };
        await target.transform(<RegisterUserDto>{ ...inputData }, metadata)
        .catch((err) => {
          expect(err.getResponse().message).toEqual(['email must be an email']);
        });
      });
  
      it('should failed under incorrect password length', async () => {
        const inputData = {
          ...mockData,
          password: '123',
        };
        await target.transform(<RegisterUserDto>{ ...inputData }, metadata)
        .catch((err) => {
          expect(err.getResponse().message).toEqual(['password must be longer than or equal to 8 characters']);
        });
      });
    })
  });
});
