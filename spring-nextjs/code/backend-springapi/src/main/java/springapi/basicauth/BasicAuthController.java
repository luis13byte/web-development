package springapi.basicauth;

import org.springframework.web.bind.annotation.*;

/**
 * springapi.basicauth
 * Class MyPageController
 * 19/02/2021
 *
 * @author luis (luis13cst@gmail.com)
 */

@RestController
public class BasicAuthController {

    @GetMapping("/")
    public String message() {
        return ("<h1>Welcome to the principal page of Tomcat (only for admins)</h1>");
    }

    @GetMapping("/user")
    public String user() {
        return ("<h1>Welcome user authenticated</h1>");
    }

    /*@GetMapping("/login")
    public String login(){
        return "account/login";
    }*/

    /*  @RequestMapping("/error")
    public String handleError() {
        return "error";
    }*/
}