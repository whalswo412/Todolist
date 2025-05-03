import { Controller, Get, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // google 로그인 클릭시 호출
    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async googleLogin(@Req() req: Request) {
        console.log('GET /auth/google/login 실행');
    }

    // 구글 로그인 콜백 주소@Get('auth/google/callback')
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        console.log('GET auth/google/callback - googleAuthRedirect 실행');
        const result = await this.authService.googleLogin(req.user);
        console.log('로그인 결과 : ', result);
        return res.status(200).json(result);  // 화면에 표시.
    }
}