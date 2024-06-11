package Sber.Sber.Controllers;

import Sber.Sber.auth.service.RealtyService;
import Sber.Sber.models.Image;
import Sber.Sber.repositories.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequiredArgsConstructor

public class ImageController {

    private final RealtyService realtyService;

    private final ImageRepository imageRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/images/{id}")
    private ResponseEntity<?> getImageById(@PathVariable Long id){
        Image image = imageRepository.findById(id).orElse(null);
        assert image != null;
        return ResponseEntity.ok()
                .header("fileName", image.getOriginalFileName())
                .contentType(MediaType.valueOf(image.getContentType()))
                .contentLength(image.getSize())
                .body(new InputStreamResource(new ByteArrayInputStream(image.getBytes())));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/image/{id}")
    public ResponseEntity<List<ImageRepository.ImageProjection>> f_image(@PathVariable("id") Long id) {
        return ResponseEntity.ok(realtyService.findByRealtyId(id));
    }
}
