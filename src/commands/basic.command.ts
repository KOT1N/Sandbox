import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'basic',
  description: 'Basic test command in console',
  options: {
    isDefault: true,
  },
})
export class BasicCommand extends CommandRunner {
  constructor() {
    super();
  }
  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    console.log('WORKING!!');
  }
}
