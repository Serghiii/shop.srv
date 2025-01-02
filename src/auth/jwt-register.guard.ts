import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtRegisterGuard extends AuthGuard('jwt-register') {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = request.params.value
		request.headers.authorization = `Bearer ${token}`
		return super.canActivate(context)
	}
}
