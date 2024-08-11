import { Reflector } from '@nestjs/core';

interface Permission {
  context: string;
}

export const Role = Reflector.createDecorator<Permission>();
