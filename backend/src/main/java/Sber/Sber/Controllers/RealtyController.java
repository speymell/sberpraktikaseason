package Sber.Sber.Controllers;

import Sber.Sber.auth.request.CreateRealtyRequest;
import Sber.Sber.auth.request.SellRealtyRequest;
import Sber.Sber.auth.service.RealtyService;
import Sber.Sber.repositories.ImageRepository;
import Sber.Sber.repositories.RealtyRepository;
import Sber.Sber.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")


public class RealtyController {

    private final RealtyRepository realtyRepository;
    private final RealtyService realtyService;
    private final ImageRepository imageRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/sellrealty")
    public ResponseEntity<String> sellRealty(@Valid @RequestBody SellRealtyRequest sellRealtyRequest){
        realtyService.sellRealty(sellRealtyRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Недвижимость с ID: " + sellRealtyRequest.getId_realty() + " продана клиенту с email'ом: " + sellRealtyRequest.getEmailclient()) + " успешно");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/realtycreate", consumes = "multipart/form-data")
    public ResponseEntity<String> createRealty(@ModelAttribute CreateRealtyRequest createRealtyRequest, @RequestParam("images") List<MultipartFile> images) throws IOException {
        realtyService.createRealty(createRealtyRequest, images);
        return ResponseEntity.ok(new ApiResponse(true, "В компанию " + createRealtyRequest.getCompanyname() + " добавлена недвижимость '" + createRealtyRequest.getRealtyname()) + "' успешно");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/realtys/{companyname}")
    public ResponseEntity<List<RealtyRepository.RealtyProjection>> f(@PathVariable("companyname") String companyname) {
        return ResponseEntity.ok(realtyService.listRealtyCompany(companyname));
    }
}
