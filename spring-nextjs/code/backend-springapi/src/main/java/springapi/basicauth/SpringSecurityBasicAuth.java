package springapi.basicauth;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * springapi.basicauth
 * Class SpringSecurityBasicAuth
 * 19/02/2021
 *
 * @author luis (luis13cst@gmail.com)
 */

@Configuration
@EnableWebSecurity
public class SpringSecurityBasicAuth extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    /** Especifica el metodo de autenticación (jdbc), el datasource que va a utilizar y BCrypt, como codificador de contraseña **/
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder())
                .usersByUsernameQuery(
                "SELECT Username, Password, Enabled from Persons where Username = ?")
                .authoritiesByUsernameQuery(
                        "SELECT Username, Role from Persons WHERE Username=?"
                );
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        // /user and /api page requires login as ROLE_USER or ROLE_ADMIN.
        // If no login, it will redirect to /login page.
        http.authorizeRequests().antMatchers("/user").access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')");
        http.authorizeRequests().antMatchers("/api").access("hasAnyRole('ROLE_ADMIN')");

        http
                .authorizeRequests()
                .antMatchers("/**").hasAnyRole("USER")
                .and()
                .formLogin().permitAll()
                .and().
                logout();
    }
}
