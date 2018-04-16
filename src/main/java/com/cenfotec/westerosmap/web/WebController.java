package com.cenfotec.westerosmap.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
	@GetMapping("/")
    public String index(Model model){
        model.addAttribute("title","Inicio");
        return "index";
    }
    @RequestMapping("/westeros")
    public String westerosView(Model model){
        model.addAttribute("title","Westeros");
        return "map";
    }
    @RequestMapping("/about")
    public String membersView(Model model){
        model.addAttribute("title","Acerca de");
        return "about";
    }
}
