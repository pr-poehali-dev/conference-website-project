import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Введите email адрес');
      return;
    }

    toast.success('Письмо с инструкциями отправлено на указанный email');
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-muted/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <Icon name="Video" className="text-primary" size={40} />
            <span className="text-2xl font-bold text-primary">ConferenceHub</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Восстановление пароля</CardTitle>
            <CardDescription>
              {!isSubmitted 
                ? 'Введите email для получения инструкций по восстановлению'
                : 'Проверьте вашу почту'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ivan.ivanov@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Отправить инструкции
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Mail" className="text-secondary" size={32} />
                </div>
                <p className="text-muted-foreground">
                  Письмо с инструкциями по восстановлению пароля отправлено на <strong>{email}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Если письмо не пришло, проверьте папку "Спам"
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Вспомнили пароль?{' '}
              <Link to="/login" className="text-secondary hover:underline font-medium">
                Войти
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
